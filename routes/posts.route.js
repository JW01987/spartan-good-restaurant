const express = require("express");
const router = express.Router({ mergeParams: true });
const { Posts, Users, UserInfos } = require("../models");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/auth-middleware.js");

//multer 설정, uploads 폴더에 전송받은 이미지를 저장.
//s3쓰지 않고 로컬에 직접 저장
const storage = multer.diskStorage({
  //diskStorage는 파일을 디스크에 저장하기 위한 모든 제어 기능을 제공
  destination: (req, file, cb) => {
    //destination은 어느 폴더안에 업로드 한 파일을 저장할 지를 결정 file은 받은 파일,
    //cb는 multer가 제공하는 콜백함수 어떻게 생겼는지는 모름.
    cb(null, "assets/uploads/"); // 이미지가 저장될 폴더 경로, null은 에러가 없음을 의미
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    //path.extname은 주어진 경로에서 .을 포함한 확장자를 얻음, .확장자 앞에 오는 이름은 버림.
    //file.originalname 은 원본의 이름을 의미
    const filename = `${Date.now()}${ext}`; // 이미지 파일명을 현재시간이랑 합쳐서, 즉 현재시간.확장자
    cb(null, filename);
  },
});

const upload = multer({
  //multer 세팅 저장.
  storage: storage,
  fileFilter: (req, file, cb) => {
    //파일 확장자 받을때 제한 설정
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("PNG, JPG 파일만 업로드 가능."));
    }
    cb(null, true); //이 파일을 허용하면 `true` 를 전달
  },
  limits: {
    //크기 제한 설정
    fileSize: 1024 * 1024,
  },
});

// 게시글 생성
router.post(
  "/posts",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    const { id } = res.locals.user; // 로그인된 사용자의 id
    const { title, content } = req.body;
    const likes = 0;
    const imagePath = req.file.path;
    console.log(req.file.path);

    const post = await Posts.create({
      userId: id,
      title,
      content,
      likes,
      image: imagePath,
    });

    return res.status(201).json({ data: post });
  }
);

// 게시글 목록 조회
router.get("/posts", async (req, res) => {
  const posts = await Posts.findAll({
    attributes: ["id", "userId", "title", "image", "createdAt", "likes"],
    // 항목 필요 시 수정
    order: [["createdAt", "ASC"]],
    include: [
      {
        model: Users,
        attributes: ["id"],
        include: [
          {
            model: UserInfos,
            attributes: ["nickname"],
          },
        ],
      },
    ],
  });

  return res.status(200).send({ data: posts });
});

// 게시글 상세 조회
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    attributes: [
      "id",
      "userId",
      "title",
      "content",
      "image",
      "createdAt",
      "updatedAt",
    ],
    where: { id: postId },
    include: [
      {
        model: Users,
        attributes: ["id"],
        include: [
          {
            model: UserInfos,
            attributes: ["nickname"],
          },
        ],
      },
    ],
  });

  return res.status(200).json({ data: post });
});

// 게시글 수정
router.put("/posts/:postId", authMiddleware, async (req, res) => {
  const { id } = res.locals.user; // 로그인된 사용자의 id
  const { postId } = req.params;
  const { title, content } = req.body;

  const post = await Posts.findOne({ where: { id: postId } });
  if (!post) {
    return res
      .status(404)
      .json({ errorMessage: "게시글이 존재하지 않습니다." });
  } else if (post.userId !== id) {
    return res.status(404).json({ errorMessage: "수정할 권한이 없습니다." });
  }

  await Posts.update(
    { title, content },
    {
      where: { id: postId },
      //   , { userId } // 59번째줄에서 이미 검증하기 때문에 주석처리하였습니다.
    }
  );
  res.status(200).json({ message: "게시글이 수정되었습니다." });
});

// 게시글 삭제
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  const { id } = res.locals.user; // 로그인된 사용자의 id
  const { postId } = req.params;

  const post = await Posts.findOne({ where: { id: postId } });
  if (!post) {
    return res
      .status(404)
      .json({ errorMessage: "게시글이 존재하지 않습니다." });
  } else if (post.userId !== id) {
    return res.status(404).json({ errorMessage: "수정할 권한이 없습니다." });
  }

  await Posts.destroy({ where: { id: postId } });

  res.status(200).json({ message: "게시글이 삭제되었습니다." });
});

router.post("/posts/:postId/like", async (req, res) => {
  const { postId } = req.params;

  const post = await Posts.findOne({ where: { id: postId } });
  if (!post) {
    return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
  }

  await Posts.update(
    { likes: post.likes + 1 },
    {
      where: { id: postId },
      //   , { userId } // 59번째줄에서 이미 검증하기 때문에 주석처리하였습니다.
    }
  );
  res.status(200).json({ data: "게시글이 수정되었습니다." });
});
module.exports = router;

const express = require("express");
const router = express.Router();
const { Posts, Users, UserInfos } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware.js");
// 게시글 생성
router.post("/posts", authMiddleware, async (req, res) => {
  const { id } = res.locals.user; // 로그인된 사용자의 id
  const { title, content } = req.body;
  const likes = 0;
  const post = await Posts.create({
    userId: id,
    title,
    content,
    likes,
  });

  return res.status(201).json({ data: post });
});

// 게시글 목록 조회
router.get("/posts", async (req, res) => {
  const posts = await Posts.findAll({
    attributes: ["id", "userId", "title", "createdAt"],
    // 항목 필요 시 수정
    order: [["createdAt", "DESC"]],
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

  return res.status(200).json({ data: posts });
});

// 게시글 상세 조회
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    attributes: ["id", "userId", "title", "content", "createdAt", "updatedAt"],
    where: { id: postId },
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
    return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
  } else if (post.userId !== id) {
    return res.status(404).json({ message: "수정할 권한이 없습니다." });
  }

  await Posts.update(
    { title, content },
    {
      where: { id: postId },
      //   , { userId } // 59번째줄에서 이미 검증하기 때문에 주석처리하였습니다.
    }
  );
  res.status(200).json({ data: "게시글이 수정되었습니다." });
});

// 게시글 삭제
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  const { id } = res.locals.user; // 로그인된 사용자의 id
  const { postId } = req.params;

  const post = await Posts.findOne({ where: { id: postId } });
  if (!post) {
    return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
  } else if (post.userId !== id) {
    return res.status(404).json({ message: "수정할 권한이 없습니다." });
  }

  await Posts.destroy({ where: { id: postId } });

  res.status(200).json({ data: "게시글이 삭제되었습니다." });
});

module.exports = router;

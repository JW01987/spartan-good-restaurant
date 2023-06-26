const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

// 게시글 생성
router.post("/posts", async (req, res) => {
  // const { userId } = res.locals.user;
  const { userId, title, content } = req.body;
  // userId는 인증 구현되면 수정해야함
  const likes = 0;
  const post = await Posts.create({
    userId,
    title,
    content,
    likes,
  });

  return res.status(201).json({ data: post });
});

// 게시글 목록 조회
router.get("/posts", async (req, res) => {
  const posts = await Posts.findAll({
    attributes: ["postId", "userId", "title", "createdAt"],
    // 항목 필요 시 수정
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({ data: posts });
});

// 게시글 상세 조회
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    attributes: [
      "postId",
      "userId",
      "title",
      "content",
      "createdAt",
      "updatedAt",
    ],
    where: { postId },
  });

  return res.status(200).json({ data: post });
});

// 게시글 수정
router.put("/posts/:postId", async (req, res) => {
  // 게시물 수정
  // const { userId } = res.locals.user;
  const { postId } = req.params;
  const { title, content } = req.body;

  const post = await Posts.findOne({ where: { postId } });
  if (!post) {
    return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
  }
  //   else if (post.userId !== userId) {
  //     return res.status(404).json({ message: "수정할 권한이 없습니다." });
  //   }

  await Posts.update(
    { title, content },
    {
      where: { postId },
      //   , { userId }
    }
  );
  res.status(200).json({ data: "게시글이 수정되었습니다." });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

// 게시글 생성
router.post("/posts", async (req, res) => {
  const { userId, title, content } = req.body;
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
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({ data: posts });
});
module.exports = router;

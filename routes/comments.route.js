const { Comments } = require("../models");
const { Posts, Users, UserInfos } = require("../models");
const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const { Op } = require("sequelize");

//댓글 생성
router.post("/posts/:postId/comments", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const { id } = res.locals.user;
  if (!content.length) {
    return res
      .status(412)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }

  const postIdCheck = await Posts.findOne({ where: { id: postId } });
  if (!postIdCheck) {
    return res
      .status(404)
      .json({ errorMessage: "게시글이 존재하지 않습니다." });
  }
  try {
    await Comments.create({
      postId,
      content,
      userId: id,
    });
  } catch {
    return res
      .status(400)
      .json({ errorMessage: "댓글 작성에 실패하였습니다." });
  }
  res.status(200).json({ message: "댓글을 작성하였습니다." });
});
//댓글 조회
router.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  try {
    const comment = await Comments.findAll({
      where: { postId },
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
    if (!comment) {
      return res
        .status(404)
        .json({ errorMessage: "댓글이 존재하지 않습니다." });
    }
    res.status(200).json({ comment });
  } catch {
    return res
      .status(400)
      .json({ errorMessage: "댓글 조회에 실패하였습니다." });
  }
});

//댓글 수정
router.put(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  async (req, res) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    const { id } = res.locals.user;
    if (!content.length) {
      return res
        .status(412)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    const postIdCheck = await Posts.findOne({ where: { id: postId } });
    if (!postIdCheck) {
      return res
        .status(404)
        .json({ errorMessage: "게시글이 존재하지 않습니다." });
    }
    try {
      const comment = await Comments.findOne({ where: { id: commentId } });
      if (comment.userId !== id) {
        return res
          .status(403)
          .json({ errorMessage: "댓글의 수정 권한이 존재하지 않습니다." });
      }
    } catch (err) {
      console.lor(err);
      return res
        .status(404)
        .json({ errorMessage: "댓글이 존재하지 않습니다." });
    }
    try {
      await Comments.update(
        { content }, // title과 content 컬럼을 수정합니다.
        {
          where: {
            [Op.and]: [{ id: commentId }, { userId: id }, { postId }],
          },
        }
      );
      res.status(200).json({ message: "댓글이 수정되었습니다." });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: "댓글 수정이 실패되었습니다." });
    }
  }
);

//댓글 삭제
router.delete(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  async (req, res) => {
    const { postId, commentId } = req.params;
    const { id } = res.locals.user;
    try {
      const comment = await Comments.findOne({
        where: { id: commentId, postId },
      });
      if (comment.userId !== id) {
        return res
          .status(403)
          .json({ errorMessage: "댓글의 삭제 권한이 존재하지 않습니다." });
      }
    } catch (err) {
      console.lor(err);
      return res
        .status(404)
        .json({ errorMessage: "댓글 삭제가 정상적으로 처리되지 않았습니다." });
    }
    try {
      await Comments.destroy({
        where: {
          [Op.and]: [{ id: commentId }],
        },
      });
      res.status(200).json({ message: "댓글이 삭제되었습니다." });
    } catch (err) {
      console.lor(err);
      res.status(400).json({ errorMessage: " 댓글 삭제에 실패하였습니다." });
    }
  }
);
module.exports = router;

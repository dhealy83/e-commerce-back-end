const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // find all categories
  try {
    const allTags = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});
// be sure to include its associated Product data

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const putTag = await Tag.update(
      rep.body,
      {
        where: {
          id: req.params.id,
        },
      },
      {
        new: true,
      }
    );
    if (!newTag) {
      res.status(400).json({ message: "No tag found for this data." });
      return;
    }
    res.status(200).json(newTag);
  } catch {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: "No tag found with this data." });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

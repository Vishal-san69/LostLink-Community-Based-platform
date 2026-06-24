const express = require("express");

const router = express.Router();

const db = require("../config/db");

const verifyToken =
  require("../middleware/authMiddleware");


/*
========================================
ADMIN CHECK MIDDLEWARE
========================================
*/

const verifyAdmin = (

  req,

  res,

  next

) => {

  if (

    req.user.role !== "admin"

  ) {

    return res.status(403).json({

      message: "Access denied"

    });

  }

  next();

};


/*
========================================
GET ADMIN STATS
========================================
*/

router.get(

  "/stats",

  verifyToken,

  verifyAdmin,

  async (req, res) => {

    try {

      const stats = {};


      /*
      TOTAL USERS
      */

      db.query(

        "SELECT COUNT(*) AS totalUsers FROM users",

        (err, usersResult) => {

          if (err) {

            return res.status(500)

              .json(err);

          }

          stats.totalUsers =

            usersResult[0]

              .totalUsers;


          /*
          TOTAL ITEMS
          */

          db.query(

            "SELECT COUNT(*) AS totalItems FROM items",

            (

              err,

              itemsResult

            ) => {

              if (err) {

                return res.status(500)

                  .json(err);

              }

              stats.totalItems =

                itemsResult[0]

                  .totalItems;


              /*
              RECOVERED ITEMS
              */

              db.query(

                `

                SELECT COUNT(*) AS recoveredItems

                FROM items

                WHERE status = 'recovered'

                `,

                (

                  err,

                  recoveredResult

                ) => {

                  if (err) {

                    return res.status(500)

                      .json(err);

                  }

                  stats.recoveredItems =

                    recoveredResult[0]

                      .recoveredItems;


                  /*
                  TOTAL COMMUNITIES
                  */

                  db.query(

                    `

                    SELECT COUNT(*) AS totalCommunities

                    FROM communities

                    `,

                    (

                      err,

                      communityResult

                    ) => {

                      if (err) {

                        return res.status(500)

                          .json(err);

                      }

                      stats.totalCommunities =

                        communityResult[0]

                          .totalCommunities;


                      res.status(200)

                        .json(stats);

                    }

                  );

                }

              );

            }

          );

        }

      );

    } catch (error) {

      res.status(500)

        .json(error);

    }

  }

);


/*
========================================
GET ALL COMMUNITIES
========================================
*/

router.get(

  "/communities",

  verifyToken,

  verifyAdmin,

  (req, res) => {

    const sql = `

      SELECT *

      FROM communities

      ORDER BY created_at DESC

    `;


    db.query(

      sql,

      (err, result) => {

        if (err) {

          return res.status(500)

            .json(err);

        }

        res.status(200)

          .json(result);

      }

    );

  }

);


/*
========================================
CREATE COMMUNITY
========================================
*/

router.post(

  "/community",

  verifyToken,

  verifyAdmin,

  (req, res) => {

    const {

      name,

      type

    } = req.body;


    const sql = `

      INSERT INTO communities

      (name, type)

      VALUES (?, ?)

    `;


    db.query(

      sql,

      [name, type],

      (err, result) => {

        if (err) {

          return res.status(500)

            .json(err);

        }

        res.status(201)

          .json({

            message:

              "Community created"

          });

      }

    );

  }

);


/*
========================================
DELETE COMMUNITY
========================================
*/

router.delete(

  "/community/:id",

  verifyToken,

  verifyAdmin,

  (req, res) => {

    const communityId =
      req.params.id;


    /*
    CHECK ITEMS INSIDE COMMUNITY
    */

    const checkSql = `

      SELECT *

      FROM items

      WHERE community_id = ?

    `;


    db.query(

      checkSql,

      [communityId],

      (err, items) => {

        if (err) {

          return res.status(500)

            .json(err);

        }


        /*
        BLOCK DELETE
        */

        if (

          items.length > 0

        ) {

          return res.status(400)

            .json({

              message:

                "Cannot delete community with existing items"

            });

        }


        /*
        DELETE COMMUNITY
        */

        const deleteSql = `

          DELETE FROM communities

          WHERE id = ?

        `;


        db.query(

          deleteSql,

          [communityId],

          (err, result) => {

            if (err) {

              return res.status(500)

                .json(err);

            }

            res.status(200)

              .json({

                message:

                  "Community deleted"

              });

          }

        );

      }

    );

  }

);


/*
========================================
DELETE ITEM
========================================
*/

router.delete(

  "/item/:id",

  verifyToken,

  verifyAdmin,

  (req, res) => {

    const itemId =
      req.params.id;


    const sql = `

      DELETE FROM items

      WHERE id = ?

    `;


    db.query(

      sql,

      [itemId],

      (err, result) => {

        if (err) {

          return res.status(500)

            .json(err);

        }

        res.status(200)

          .json({

            message:

              "Item deleted"

          });

      }

    );

  }

);


/*
========================================
GET ALL USERS
========================================
*/

router.get(

  "/users",

  verifyToken,

  verifyAdmin,

  (req, res) => {

    const sql = `

      SELECT

        id,

        name,

        email,

        role,

        created_at

      FROM users

      ORDER BY created_at DESC

    `;


    db.query(

      sql,

      (err, result) => {

        if (err) {

          return res.status(500)

            .json(err);

        }

        res.status(200)

          .json(result);

      }

    );

  }

);


/*
========================================
DELETE USER
========================================
*/

router.delete(

  "/user/:id",

  verifyToken,

  verifyAdmin,

  (req, res) => {

    const userId =
      req.params.id;


    /*
    PREVENT ADMIN SELF DELETE
    */

    if (

      parseInt(userId) === req.user.id

    ) {

      return res.status(400)

        .json({

          message:

            "You cannot delete your own admin account"

        });

    }


    /*
    CHECK USER ROLE
    */

    const checkSql = `

      SELECT role

      FROM users

      WHERE id = ?

    `;


    db.query(

      checkSql,

      [userId],

      (err, result) => {

        if (err) {

          return res.status(500)

            .json(err);

        }


        if (

          result.length === 0

        ) {

          return res.status(404)

            .json({

              message:

                "User not found"

            });

        }


        /*
        PREVENT ADMIN DELETE
        */

        if (

          result[0].role === "admin"

        ) {

          return res.status(400)

            .json({

              message:

                "Cannot delete another admin"

            });

        }


        /*
        DELETE USER ITEMS FIRST
        */

        db.query(

          "DELETE FROM items WHERE user_id = ?",

          [userId],

          (err) => {

            if (err) {

              return res.status(500)

                .json(err);

            }


            /*
            DELETE USER
            */

            db.query(

              "DELETE FROM users WHERE id = ?",

              [userId],

              (err) => {

                if (err) {

                  return res.status(500)

                    .json(err);

                }

                res.status(200)

                  .json({

                    message:

                      "User deleted successfully"

                  });

              }

            );

          }

        );

      }

    );

  }

);


module.exports = router;
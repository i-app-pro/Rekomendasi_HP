SELECT
  `rs`.`id` AS `session_id`,
  `u`.`nama` AS `nama_customer`,
  `p`.`id` AS `product_id`,
  `p`.`nama` AS `nama_produk`,
  `b`.`nama` AS `nama_brand`,
  `cv_harga`.`nilai` AS `c1`,
  `cv_ram`.`nilai` AS `c2`,
  `cv_penyimpanan`.`nilai` AS `c3`,
  `cv_baterai`.`nilai` AS `c4`,
  `cv_os`.`nilai` AS `c5`,
  `cv_kam`.`nilai` AS `c6`,
  MAX(
    CASE
      WHEN `pemb`.`criteria_id` = 1 THEN `pemb`.`nilai_bobot`
    END
  ) AS `bobot_c1`,
  MAX(
    CASE
      WHEN `pemb`.`criteria_id` = 2 THEN `pemb`.`nilai_bobot`
    END
  ) AS `bobot_c2`,
  MAX(
    CASE
      WHEN `pemb`.`criteria_id` = 3 THEN `pemb`.`nilai_bobot`
    END
  ) AS `bobot_c3`,
  MAX(
    CASE
      WHEN `pemb`.`criteria_id` = 4 THEN `pemb`.`nilai_bobot`
    END
  ) AS `bobot_c4`,
  MAX(
    CASE
      WHEN `pemb`.`criteria_id` = 5 THEN `pemb`.`nilai_bobot`
    END
  ) AS `bobot_c5`,
  MAX(
    CASE
      WHEN `pemb`.`criteria_id` = 6 THEN `pemb`.`nilai_bobot`
    END
  ) AS `bobot_c6`
FROM
  (
    (
      (
        (
          (
            (
              (
                (
                  (
                    `hp`.`recommendation_session` AS `rs`
                    JOIN `hp`.`user` AS `u` ON (`rs`.`user_id` = `u`.`id`)
                  )
                  JOIN `hp`.`products` AS `p`
                )
                JOIN `hp`.`brands` AS `b` ON (`p`.`brands_id` = `b`.`id`)
              )
              JOIN `hp`.`pembobotan` AS `pemb` ON (`rs`.`id` = `pemb`.`recommendation_session_id`)
            )
            JOIN `hp`.`criteria_value` AS `cv_harga` ON (`p`.`harga` = `cv_harga`.`id`)
          )
          JOIN `hp`.`criteria_value` AS `cv_ram` ON (`p`.`ram` = `cv_ram`.`id`)
        )
        JOIN `hp`.`criteria_value` AS `cv_penyimpanan` ON (`p`.`penyimpanan` = `cv_penyimpanan`.`id`)
      )
      JOIN `hp`.`criteria_value` AS `cv_baterai` ON (`p`.`baterai` = `cv_baterai`.`id`)
    )
    JOIN `hp`.`criteria_value` AS `cv_os` ON (`p`.`update_os` = `cv_os`.`id`)
  )
  JOIN `hp`.`criteria_value` AS `cv_kam` ON (`p`.`resolusi_kamera` = `cv_kam`.`id`)
GROUP BY
  `rs`.`id`,
  `u`.`nama`,
  `p`.`id`,
  `p`.`nama`,
  `b`.`nama`,
  `cv_harga`.`nilai`,
  `cv_ram`.`nilai`,
  `cv_penyimpanan`.`nilai`,
  `cv_baterai`.`nilai`,
  `cv_os`.`nilai`,
  `cv_kam`.`nilai`
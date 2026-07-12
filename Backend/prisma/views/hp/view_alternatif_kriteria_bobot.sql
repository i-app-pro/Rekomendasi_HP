SELECT
  `rs`.`id` AS `session_id`,
  `u`.`nama` AS `nama_customer`,
  `p`.`id` AS `product_id`,
  `p`.`nama` AS `nama_produk`,
  `b`.`nama` AS `nama_brand`,
CASE
    WHEN `p`.`harga` <= 3000000 THEN 1
    WHEN `p`.`harga` <= 4500000 THEN 2
    WHEN `p`.`harga` <= 6500000 THEN 3
    ELSE 4
  END AS `c1`,
CASE
    WHEN `p`.`ram` < 8 THEN 1
    ELSE 2
  END AS `c2`,
CASE
    WHEN `p`.`penyimpanan` < 256 THEN 1
    ELSE 2
  END AS `c3`,
CASE
    WHEN `p`.`baterai` < 5000 THEN 1
    ELSE 2
  END AS `c4`,
CASE
    WHEN `p`.`update_os` < 3 THEN 1
    ELSE 2
  END AS `c5`,
CASE
    WHEN `p`.`resolusi_kamera` <= 50 THEN 1
    ELSE 2
  END AS `c6`,
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
  ) AS `bobot_c6`,
  MAX(
    CASE
      WHEN `cv_pref`.`criteria_id` = 1 THEN `cv_pref`.`nilai`
    END
  ) AS `pref_c1`,
  MAX(
    CASE
      WHEN `cv_pref`.`criteria_id` = 2 THEN `cv_pref`.`nilai`
    END
  ) AS `pref_c2`,
  MAX(
    CASE
      WHEN `cv_pref`.`criteria_id` = 3 THEN `cv_pref`.`nilai`
    END
  ) AS `pref_c3`,
  MAX(
    CASE
      WHEN `cv_pref`.`criteria_id` = 4 THEN `cv_pref`.`nilai`
    END
  ) AS `pref_c4`,
  MAX(
    CASE
      WHEN `cv_pref`.`criteria_id` = 5 THEN `cv_pref`.`nilai`
    END
  ) AS `pref_c5`,
  MAX(
    CASE
      WHEN `cv_pref`.`criteria_id` = 6 THEN `cv_pref`.`nilai`
    END
  ) AS `pref_c6`
FROM
  (
    (
      (
        (
          (
            `hp`.`recommendation_session` AS `rs`
            JOIN `hp`.`user` AS `u` ON `rs`.`user_id` = `u`.`id`
          )
          JOIN `hp`.`products` AS `p` ON 1 = 1
        )
        LEFT JOIN `hp`.`pembobotan` AS `pemb` ON `rs`.`id` = `pemb`.`recommendation_session_id`
      )
      LEFT JOIN `hp`.`user_preferences` AS `pref` ON `rs`.`id` = `pref`.`recommendation_session_id`
    )
    LEFT JOIN `hp`.`criteria_value` AS `cv_pref` ON `pref`.`criteria_value_id` = `cv_pref`.`id`
  )
  LEFT JOIN `hp`.`brands` AS `b` ON `p`.`brands_id` = `b`.`id`
GROUP BY
  `rs`.`id`,
  `u`.`nama`,
  `p`.`id`,
  `p`.`nama`,
  `b`.`nama`
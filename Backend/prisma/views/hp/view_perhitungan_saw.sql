SELECT
  `hasil`.`session_id` AS `session_id`,
  `hasil`.`nama_customer` AS `nama_customer`,
  `hasil`.`product_id` AS `product_id`,
  `hasil`.`nama_produk` AS `nama_produk`,
  `hasil`.`nama_brand` AS `nama_brand`,
  `hasil`.`nilai_saw` AS `nilai_saw`,
  DENSE_RANK() OVER (
    PARTITION BY `hasil`.`session_id`
    ORDER BY
      `hasil`.`nilai_saw` DESC
  ) AS `ranking_saw`
FROM
  (
    SELECT
      `v`.`session_id` AS `session_id`,
      `v`.`nama_customer` AS `nama_customer`,
      `v`.`product_id` AS `product_id`,
      `v`.`nama_produk` AS `nama_produk`,
      `v`.`nama_brand` AS `nama_brand`,
      ROUND(
        (
          MIN(`v`.`c1`) OVER (PARTITION BY `v`.`session_id`) / NULLIF(`v`.`c1`, 0)
        ) *(
          `v`.`bobot_c1` / NULLIF(
            `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
            0
          )
        ) +(
          `v`.`c2` / NULLIF(
            MAX(`v`.`c2`) OVER (PARTITION BY `v`.`session_id`),
            0
          )
        ) *(
          `v`.`bobot_c2` / NULLIF(
            `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
            0
          )
        ) +(
          `v`.`c3` / NULLIF(
            MAX(`v`.`c3`) OVER (PARTITION BY `v`.`session_id`),
            0
          )
        ) *(
          `v`.`bobot_c3` / NULLIF(
            `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
            0
          )
        ) +(
          `v`.`c4` / NULLIF(
            MAX(`v`.`c4`) OVER (PARTITION BY `v`.`session_id`),
            0
          )
        ) *(
          `v`.`bobot_c4` / NULLIF(
            `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
            0
          )
        ) +(
          `v`.`c5` / NULLIF(
            MAX(`v`.`c5`) OVER (PARTITION BY `v`.`session_id`),
            0
          )
        ) *(
          `v`.`bobot_c5` / NULLIF(
            `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
            0
          )
        ) +(
          `v`.`c6` / NULLIF(
            MAX(`v`.`c6`) OVER (PARTITION BY `v`.`session_id`),
            0
          )
        ) *(
          `v`.`bobot_c6` / NULLIF(
            `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
            0
          )
        ),
        6
      ) AS `nilai_saw`
    FROM
      `hp`.`view_alternatif_kriteria_bobot` AS `v`
  ) AS `hasil`
SELECT
  `final_result`.`session_id` AS `session_id`,
  `final_result`.`nama_customer` AS `nama_customer`,
  `final_result`.`product_id` AS `product_id`,
  `final_result`.`nama_produk` AS `nama_produk`,
  `final_result`.`nama_brand` AS `nama_brand`,
  `final_result`.`a_plus_c1` AS `a_plus_c1`,
  `final_result`.`a_plus_c2` AS `a_plus_c2`,
  `final_result`.`a_plus_c3` AS `a_plus_c3`,
  `final_result`.`a_plus_c4` AS `a_plus_c4`,
  `final_result`.`a_plus_c5` AS `a_plus_c5`,
  `final_result`.`a_plus_c6` AS `a_plus_c6`,
  `final_result`.`a_minus_c1` AS `a_minus_c1`,
  `final_result`.`a_minus_c2` AS `a_minus_c2`,
  `final_result`.`a_minus_c3` AS `a_minus_c3`,
  `final_result`.`a_minus_c4` AS `a_minus_c4`,
  `final_result`.`a_minus_c5` AS `a_minus_c5`,
  `final_result`.`a_minus_c6` AS `a_minus_c6`,
  ROUND(`final_result`.`d_plus`, 8) AS `d_plus`,
  ROUND(`final_result`.`d_minus`, 8) AS `d_minus`,
  `final_result`.`nilai_topsis` AS `nilai_topsis`,
  DENSE_RANK() OVER (
    PARTITION BY `final_result`.`session_id`
    ORDER BY
      `final_result`.`nilai_topsis` DESC
  ) AS `ranking_topsis`
FROM
  (
    SELECT
      `hp`.`jarak`.`session_id` AS `session_id`,
      `hp`.`jarak`.`nama_customer` AS `nama_customer`,
      `hp`.`jarak`.`product_id` AS `product_id`,
      `hp`.`jarak`.`nama_produk` AS `nama_produk`,
      `hp`.`jarak`.`nama_brand` AS `nama_brand`,
      `jarak`.`y1` AS `y1`,
      `jarak`.`y2` AS `y2`,
      `jarak`.`y3` AS `y3`,
      `jarak`.`y4` AS `y4`,
      `jarak`.`y5` AS `y5`,
      `jarak`.`y6` AS `y6`,
      `jarak`.`a_plus_c1` AS `a_plus_c1`,
      `jarak`.`a_plus_c2` AS `a_plus_c2`,
      `jarak`.`a_plus_c3` AS `a_plus_c3`,
      `jarak`.`a_plus_c4` AS `a_plus_c4`,
      `jarak`.`a_plus_c5` AS `a_plus_c5`,
      `jarak`.`a_plus_c6` AS `a_plus_c6`,
      `jarak`.`a_minus_c1` AS `a_minus_c1`,
      `jarak`.`a_minus_c2` AS `a_minus_c2`,
      `jarak`.`a_minus_c3` AS `a_minus_c3`,
      `jarak`.`a_minus_c4` AS `a_minus_c4`,
      `jarak`.`a_minus_c5` AS `a_minus_c5`,
      `jarak`.`a_minus_c6` AS `a_minus_c6`,
      `jarak`.`d_plus` AS `d_plus`,
      `jarak`.`d_minus` AS `d_minus`,
      ROUND(
        `jarak`.`d_minus` / NULLIF(`jarak`.`d_plus` + `jarak`.`d_minus`, 0),
        8
      ) AS `nilai_topsis`
    FROM
      (
        SELECT
          `hp`.`ideal`.`session_id` AS `session_id`,
          `hp`.`ideal`.`nama_customer` AS `nama_customer`,
          `hp`.`ideal`.`product_id` AS `product_id`,
          `hp`.`ideal`.`nama_produk` AS `nama_produk`,
          `hp`.`ideal`.`nama_brand` AS `nama_brand`,
          `ideal`.`y1` AS `y1`,
          `ideal`.`y2` AS `y2`,
          `ideal`.`y3` AS `y3`,
          `ideal`.`y4` AS `y4`,
          `ideal`.`y5` AS `y5`,
          `ideal`.`y6` AS `y6`,
          `ideal`.`a_plus_c1` AS `a_plus_c1`,
          `ideal`.`a_plus_c2` AS `a_plus_c2`,
          `ideal`.`a_plus_c3` AS `a_plus_c3`,
          `ideal`.`a_plus_c4` AS `a_plus_c4`,
          `ideal`.`a_plus_c5` AS `a_plus_c5`,
          `ideal`.`a_plus_c6` AS `a_plus_c6`,
          `ideal`.`a_minus_c1` AS `a_minus_c1`,
          `ideal`.`a_minus_c2` AS `a_minus_c2`,
          `ideal`.`a_minus_c3` AS `a_minus_c3`,
          `ideal`.`a_minus_c4` AS `a_minus_c4`,
          `ideal`.`a_minus_c5` AS `a_minus_c5`,
          `ideal`.`a_minus_c6` AS `a_minus_c6`,
          SQRT(
            POWER(`ideal`.`y1` - `ideal`.`a_plus_c1`, 2) + POWER(`ideal`.`y2` - `ideal`.`a_plus_c2`, 2) + POWER(`ideal`.`y3` - `ideal`.`a_plus_c3`, 2) + POWER(`ideal`.`y4` - `ideal`.`a_plus_c4`, 2) + POWER(`ideal`.`y5` - `ideal`.`a_plus_c5`, 2) + POWER(`ideal`.`y6` - `ideal`.`a_plus_c6`, 2)
          ) AS `d_plus`,
          SQRT(
            POWER(`ideal`.`y1` - `ideal`.`a_minus_c1`, 2) + POWER(`ideal`.`y2` - `ideal`.`a_minus_c2`, 2) + POWER(`ideal`.`y3` - `ideal`.`a_minus_c3`, 2) + POWER(`ideal`.`y4` - `ideal`.`a_minus_c4`, 2) + POWER(`ideal`.`y5` - `ideal`.`a_minus_c5`, 2) + POWER(`ideal`.`y6` - `ideal`.`a_minus_c6`, 2)
          ) AS `d_minus`
        FROM
          (
            SELECT
              `hp`.`y`.`session_id` AS `session_id`,
              `hp`.`y`.`nama_customer` AS `nama_customer`,
              `hp`.`y`.`product_id` AS `product_id`,
              `hp`.`y`.`nama_produk` AS `nama_produk`,
              `hp`.`y`.`nama_brand` AS `nama_brand`,
              `y`.`y1` AS `y1`,
              `y`.`y2` AS `y2`,
              `y`.`y3` AS `y3`,
              `y`.`y4` AS `y4`,
              `y`.`y5` AS `y5`,
              `y`.`y6` AS `y6`,
              MIN(`y`.`y1`) OVER (PARTITION BY `y`.`session_id`) AS `a_plus_c1`,
              MAX(`y`.`y2`) OVER (PARTITION BY `y`.`session_id`) AS `a_plus_c2`,
              MAX(`y`.`y3`) OVER (PARTITION BY `y`.`session_id`) AS `a_plus_c3`,
              MAX(`y`.`y4`) OVER (PARTITION BY `y`.`session_id`) AS `a_plus_c4`,
              MAX(`y`.`y5`) OVER (PARTITION BY `y`.`session_id`) AS `a_plus_c5`,
              MAX(`y`.`y6`) OVER (PARTITION BY `y`.`session_id`) AS `a_plus_c6`,
              MAX(`y`.`y1`) OVER (PARTITION BY `y`.`session_id`) AS `a_minus_c1`,
              MIN(`y`.`y2`) OVER (PARTITION BY `y`.`session_id`) AS `a_minus_c2`,
              MIN(`y`.`y3`) OVER (PARTITION BY `y`.`session_id`) AS `a_minus_c3`,
              MIN(`y`.`y4`) OVER (PARTITION BY `y`.`session_id`) AS `a_minus_c4`,
              MIN(`y`.`y5`) OVER (PARTITION BY `y`.`session_id`) AS `a_minus_c5`,
              MIN(`y`.`y6`) OVER (PARTITION BY `y`.`session_id`) AS `a_minus_c6`
            FROM
              (
                SELECT
                  `r`.`session_id` AS `session_id`,
                  `r`.`nama_customer` AS `nama_customer`,
                  `r`.`product_id` AS `product_id`,
                  `r`.`nama_produk` AS `nama_produk`,
                  `r`.`nama_brand` AS `nama_brand`,
                  `r`.`r1` * `r`.`w1` AS `y1`,
                  `r`.`r2` * `r`.`w2` AS `y2`,
                  `r`.`r3` * `r`.`w3` AS `y3`,
                  `r`.`r4` * `r`.`w4` AS `y4`,
                  `r`.`r5` * `r`.`w5` AS `y5`,
                  `r`.`r6` * `r`.`w6` AS `y6`
                FROM
                  (
                    SELECT
                      `v`.`session_id` AS `session_id`,
                      `v`.`nama_customer` AS `nama_customer`,
                      `v`.`product_id` AS `product_id`,
                      `v`.`nama_produk` AS `nama_produk`,
                      `v`.`nama_brand` AS `nama_brand`,
                      `v`.`c1` / NULLIF(
                        SQRT(
                          SUM(POWER(`v`.`c1`, 2)) OVER (PARTITION BY `v`.`session_id`)
                        ),
                        0
                      ) AS `r1`,
                      `v`.`c2` / NULLIF(
                        SQRT(
                          SUM(POWER(`v`.`c2`, 2)) OVER (PARTITION BY `v`.`session_id`)
                        ),
                        0
                      ) AS `r2`,
                      `v`.`c3` / NULLIF(
                        SQRT(
                          SUM(POWER(`v`.`c3`, 2)) OVER (PARTITION BY `v`.`session_id`)
                        ),
                        0
                      ) AS `r3`,
                      `v`.`c4` / NULLIF(
                        SQRT(
                          SUM(POWER(`v`.`c4`, 2)) OVER (PARTITION BY `v`.`session_id`)
                        ),
                        0
                      ) AS `r4`,
                      `v`.`c5` / NULLIF(
                        SQRT(
                          SUM(POWER(`v`.`c5`, 2)) OVER (PARTITION BY `v`.`session_id`)
                        ),
                        0
                      ) AS `r5`,
                      `v`.`c6` / NULLIF(
                        SQRT(
                          SUM(POWER(`v`.`c6`, 2)) OVER (PARTITION BY `v`.`session_id`)
                        ),
                        0
                      ) AS `r6`,
                      `v`.`bobot_c1` / NULLIF(
                        `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
                        0
                      ) AS `w1`,
                      `v`.`bobot_c2` / NULLIF(
                        `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
                        0
                      ) AS `w2`,
                      `v`.`bobot_c3` / NULLIF(
                        `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
                        0
                      ) AS `w3`,
                      `v`.`bobot_c4` / NULLIF(
                        `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
                        0
                      ) AS `w4`,
                      `v`.`bobot_c5` / NULLIF(
                        `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
                        0
                      ) AS `w5`,
                      `v`.`bobot_c6` / NULLIF(
                        `v`.`bobot_c1` + `v`.`bobot_c2` + `v`.`bobot_c3` + `v`.`bobot_c4` + `v`.`bobot_c5` + `v`.`bobot_c6`,
                        0
                      ) AS `w6`
                    FROM
                      `hp`.`view_alternatif_kriteria_bobot` AS `v`
                  ) AS `r`
              ) AS `y`
          ) AS `ideal`
      ) AS `jarak`
  ) AS `final_result`
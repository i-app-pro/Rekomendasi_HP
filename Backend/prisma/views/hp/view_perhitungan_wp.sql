SELECT
  `hasil`.`session_id` AS `session_id`,
  `hasil`.`nama_customer` AS `nama_customer`,
  `hasil`.`product_id` AS `product_id`,
  `hasil`.`nama_produk` AS `nama_produk`,
  `hasil`.`nama_brand` AS `nama_brand`,
  `hasil`.`nilai_s` AS `nilai_s`,
  `hasil`.`nilai_v` AS `nilai_v`,
  RANK() OVER (
    PARTITION BY `hasil`.`session_id`
    ORDER BY
      `hasil`.`nilai_v` DESC
  ) AS `ranking`
FROM
  (
    SELECT
      `a`.`session_id` AS `session_id`,
      `a`.`nama_customer` AS `nama_customer`,
      `a`.`product_id` AS `product_id`,
      `a`.`nama_produk` AS `nama_produk`,
      `a`.`nama_brand` AS `nama_brand`,
(
        POW(`a`.`c1`, - `a`.`bobot_c1` / 100) * POW(`a`.`c2`, `a`.`bobot_c2` / 100) * POW(`a`.`c3`, `a`.`bobot_c3` / 100) * POW(`a`.`c4`, `a`.`bobot_c4` / 100) * POW(`a`.`c5`, `a`.`bobot_c5` / 100) * POW(`a`.`c6`, `a`.`bobot_c6` / 100)
      ) AS `nilai_s`,
(
        POW(`a`.`c1`, - `a`.`bobot_c1` / 100) * POW(`a`.`c2`, `a`.`bobot_c2` / 100) * POW(`a`.`c3`, `a`.`bobot_c3` / 100) * POW(`a`.`c4`, `a`.`bobot_c4` / 100) * POW(`a`.`c5`, `a`.`bobot_c5` / 100) * POW(`a`.`c6`, `a`.`bobot_c6` / 100)
      ) / SUM(
        POW(`a`.`c1`, - `a`.`bobot_c1` / 100) * POW(`a`.`c2`, `a`.`bobot_c2` / 100) * POW(`a`.`c3`, `a`.`bobot_c3` / 100) * POW(`a`.`c4`, `a`.`bobot_c4` / 100) * POW(`a`.`c5`, `a`.`bobot_c5` / 100) * POW(`a`.`c6`, `a`.`bobot_c6` / 100)
      ) OVER (PARTITION BY `a`.`session_id`) AS `nilai_v`
    FROM
      `hp`.`view_alternatif_kriteria_bobot` AS `a`
  ) AS `hasil`
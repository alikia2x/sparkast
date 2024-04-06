SELECT processed_url, title,
    timeK * 4.4 + (visitK + typeK) * 6.5 + typeK * 0.22 + relativeK AS searchRank
FROM (
    SELECT *,
    CASE
        WHEN processed_url LIKE '[query]%' THEN
            CASE
                WHEN (title like '% [query]%' or title like '[query]%') THEN 12.5
                ELSE 12.3
            END
        ELSE
            CASE
                WHEN processed_url LIKE '%[query]%' THEN 2.5
                ELSE
                    CASE
                         WHEN (title like '% [query]%' or title like '[query]%') THEN 1.6
                        ELSE -1
                    END
            END
    END AS relativeK
    FROM (
        SELECT *,
            (1 / (5.2 * LOG(38, 0.000015 * (strftime('%s', 'now') - last_visit_time / 1000000 - (strftime('%s', '1601-01-01'))) + 1) + 1)) AS timeK,
            (1 / (-1 * ln(5 * visit_count + 2.71828)) + 1.07) AS visitK,
            (1 / (-1 * ln(7 * typed_count + 2.71828)) + 1.12) AS typeK,
            CASE 
                WHEN INSTR(url, '://') > 0 THEN 
                    CASE 
                        WHEN INSTR(SUBSTR(url, INSTR(url, '://') + 3), 'www.') = 1 THEN SUBSTR(SUBSTR(url, INSTR(url, '://') + 3), INSTR(SUBSTR(url, INSTR(url, '://') + 3), '.') + 1)
                        ELSE SUBSTR(url, INSTR(url, '://') + 3)
                    END
                ELSE 
                    CASE 
                        WHEN INSTR(url, 'www.') = 1 THEN SUBSTR(url, INSTR(url, '.') + 1)
                        ELSE url
                    END
            END AS processed_url
        FROM urls
    ) AS subquery where relativeK > 0 and hidden <> 1
) AS subquery
group by processed_url
ORDER BY searchRank DESC
LIMIT 9
;

SELECT processed_url, title,
    timeK * 4.4 + (visitK + typeK) * 6.5 + typeK * 0.22 + relativeK AS searchRank
FROM (
    SELECT *,
    CASE
        WHEN processed_url LIKE '[query]%' THEN -1
        ELSE
            CASE
                WHEN (title like '% [query]%' or title like '[query]%') THEN 1.6
                ELSE -1
            END
    END AS relativeK
    FROM (
        SELECT *,
            (1 / (5.2 * LOG(38, 0.000015 * (strftime('%s', 'now') - last_visit_time / 1000000 - (strftime('%s', '1601-01-01'))) + 1) + 1)) AS timeK,
            (1 / (-1 * ln(5 * visit_count + 2.71828)) + 1.07) AS visitK,
            (1 / (-1 * ln(7 * typed_count + 2.71828)) + 1.12) AS typeK,
            CASE 
                WHEN INSTR(url, '://') > 0 THEN 
                    CASE 
                        WHEN INSTR(SUBSTR(url, INSTR(url, '://') + 3), 'www.') = 1 THEN SUBSTR(SUBSTR(url, INSTR(url, '://') + 3), INSTR(SUBSTR(url, INSTR(url, '://') + 3), '.') + 1)
                        ELSE SUBSTR(url, INSTR(url, '://') + 3)
                    END
                ELSE 
                    CASE 
                        WHEN INSTR(url, 'www.') = 1 THEN SUBSTR(url, INSTR(url, '.') + 1)
                        ELSE url
                    END
            END AS processed_url
        FROM urls
    ) AS subquery where hidden <> 1 and relativeK > 0
) AS subquery
group by processed_url
ORDER BY searchRank DESC
LIMIT 6
;
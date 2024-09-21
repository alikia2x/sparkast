select
    *
from
    moz_places
where
    rev_host like '%amgif.www.'
    or rev_host like '%amgif.'
group by
    rev_host
order by
    sum(frecency) desc
limit
    8;

select
    *
from
    moz_places
where
    rev_host like '%amgif%'
    or url like '%figma%'
group by
    rev_host
order by
    sum(frecency) desc
limit
    4;

select
    *
from
    moz_places
where
    title like '%figma%'
group by
    rev_host
order by
    sum(frecency) desc
limit
    3;
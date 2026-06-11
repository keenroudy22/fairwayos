-- Seed a starter set of real public golf courses in Indiana.
-- Safe to run multiple times because each insert checks for an existing name.

insert into public.courses (name, city, state, website, phone)
select
  'Prairie View Golf Club',
  'Carmel',
  'Indiana',
  'https://www.prairieviewgc.com/',
  '317-816-3100'
where not exists (
  select 1 from public.courses where name = 'Prairie View Golf Club'
);

insert into public.courses (name, city, state, website, phone)
select
  'Purgatory Golf Club',
  'Noblesville',
  'Indiana',
  'https://www.purgatorygolf.com/',
  '317-776-4653'
where not exists (
  select 1 from public.courses where name = 'Purgatory Golf Club'
);

insert into public.courses (name, city, state, website, phone)
select
  'The Fort Golf Resort',
  'Indianapolis',
  'Indiana',
  'https://www.thefortgolfcourse.com/',
  '317-543-9597'
where not exists (
  select 1 from public.courses where name = 'The Fort Golf Resort'
);

insert into public.courses (name, city, state, website, phone)
select
  'Southern Dunes Golf Course',
  'Indianapolis',
  'Indiana',
  'https://southerndunesgolfcourse.com/',
  '317-865-1800'
where not exists (
  select 1 from public.courses where name = 'Southern Dunes Golf Course'
);

insert into public.courses (name, city, state, website, phone)
select
  'Warren Golf Course',
  'South Bend',
  'Indiana',
  'https://warrengolfcourse.com/',
  '574-631-4653'
where not exists (
  select 1 from public.courses where name = 'Warren Golf Course'
);

insert into public.courses (name, city, state, website, phone)
select
  'Birck Boilermaker Golf Complex',
  'West Lafayette',
  'Indiana',
  'https://purduegolf.com/',
  '765-494-3139'
where not exists (
  select 1 from public.courses where name = 'Birck Boilermaker Golf Complex'
);

insert into public.courses (name, city, state, website, phone)
select
  'Sultan''s Run Golf Club',
  'Jasper',
  'Indiana',
  'https://www.sultansrun.com/',
  '812-482-1009'
where not exists (
  select 1 from public.courses where name = 'Sultan''s Run Golf Club'
);

insert into public.courses (name, city, state, website, phone)
select
  'Forest Park Golf Course',
  'Valparaiso',
  'Indiana',
  'https://www.valpoparksgolf.com/',
  '219-531-7888'
where not exists (
  select 1 from public.courses where name = 'Forest Park Golf Course'
);

insert into public.courses (name, city, state, website, phone)
select
  'Harbor Links Golf Club',
  'Liberty',
  'Indiana',
  'https://www.harborlinksgc.com/',
  '765-458-9999'
where not exists (
  select 1 from public.courses where name = 'Harbor Links Golf Club'
);

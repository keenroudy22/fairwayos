-- Seed starter posts for Indiana public courses already inserted into public.courses.
-- Safe to run multiple times because each insert checks for an existing title per course.

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Tee Time Alert', 'Sunrise tee times just opened for Friday',
  'A few early groups opened between 7:10 AM and 8:00 AM. Book online before they disappear.',
  'Book Now', c.website
from public.courses c
where c.name = 'Prairie View Golf Club'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Sunrise tee times just opened for Friday'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Event', 'Friday demo day on the range',
  'We will have fitting bays open from 2 PM to 6 PM with walk-up spots available throughout the afternoon.',
  'View Course', c.website
from public.courses c
where c.name = 'Prairie View Golf Club'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Friday demo day on the range'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Promotion', 'Twilight rate is live after 5 PM',
  'Grab a late round this evening with cart included. Great weather and fast greens heading into sunset.',
  'Book Now', c.website
from public.courses c
where c.name = 'Purgatory Golf Club'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Twilight rate is live after 5 PM'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Tournament', 'Weekend four-ball spots still available',
  'A few teams can still get into this weekends event. Call the shop or register online today.',
  'Learn More', c.website
from public.courses c
where c.name = 'Purgatory Golf Club'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Weekend four-ball spots still available'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Course Update', 'Range opens late tomorrow',
  'The practice range will open at 10 AM tomorrow morning while our team completes maintenance work.',
  null, null
from public.courses c
where c.name = 'The Fort Golf Resort'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Range opens late tomorrow'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Event', 'Nine and dine registration open',
  'Bring a partner for an evening nine-hole event followed by dinner and drinks at the clubhouse.',
  'Reserve Spot', c.website
from public.courses c
where c.name = 'The Fort Golf Resort'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Nine and dine registration open'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Tee Time Alert', 'Mid-morning openings after a group cancellation',
  'We just had four tee times open between 9:40 AM and 10:20 AM for tomorrow.',
  'Book Now', c.website
from public.courses c
where c.name = 'Southern Dunes Golf Course'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Mid-morning openings after a group cancellation'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Promotion', 'Junior golf special this weekend',
  'Kids play at a reduced rate after 2 PM on Saturday and Sunday with a paid adult round.',
  'Plan Your Round', c.website
from public.courses c
where c.name = 'Southern Dunes Golf Course'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Junior golf special this weekend'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Event', 'Member guest reception tonight',
  'Players and guests are welcome on the patio at 6 PM for pairings, appetizers, and live music.',
  'View Course', c.website
from public.courses c
where c.name = 'Warren Golf Course'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Member guest reception tonight'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Course Update', 'Practice greens rolling quick this week',
  'Speeds are up and conditions are excellent heading into a busy weekend on property.',
  null, null
from public.courses c
where c.name = 'Warren Golf Course'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Practice greens rolling quick this week'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Tournament', 'College golf showcase this Monday',
  'Spectators are welcome in the afternoon as local players compete across both championship layouts.',
  'Learn More', c.website
from public.courses c
where c.name = 'Birck Boilermaker Golf Complex'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'College golf showcase this Monday'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Tee Time Alert', 'Late afternoon tee sheet has room',
  'Several groups opened after 3 PM today if you want a quick walk before sunset.',
  'Book Now', c.website
from public.courses c
where c.name = 'Birck Boilermaker Golf Complex'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Late afternoon tee sheet has room'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Promotion', 'Stay and play packages available next week',
  'Plan a quick golf getaway with available lodging and open tee times across the week.',
  'Learn More', c.website
from public.courses c
where c.name = 'Sultan''s Run Golf Club'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Stay and play packages available next week'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Course Update', 'Course is draining well after overnight rain',
  'Fairways are open and carts are out this morning. Expect soft approaches and smooth greens.',
  null, null
from public.courses c
where c.name = 'Sultan''s Run Golf Club'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Course is draining well after overnight rain'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Event', 'Wednesday couples league welcomes new teams',
  'Still room for a few pairings if you want a regular weekly game this summer.',
  'Learn More', c.website
from public.courses c
where c.name = 'Forest Park Golf Course'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Wednesday couples league welcomes new teams'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Promotion', 'Replay rate available after your first round',
  'Ask the shop about same-day replay pricing if you want to loop back out this afternoon.',
  'Visit Course', c.website
from public.courses c
where c.name = 'Forest Park Golf Course'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Replay rate available after your first round'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Tee Time Alert', 'Lakefront morning times just hit the sheet',
  'Saturday times opened between 8 AM and 9 AM for players looking to get out early.',
  'Book Now', c.website
from public.courses c
where c.name = 'Harbor Links Golf Club'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Lakefront morning times just hit the sheet'
  );

insert into public.posts (course_id, type, title, description, button_text, button_link)
select c.id, 'Event', 'Summer scramble registration now open',
  'Grab your foursome and sign up for a relaxed event with prizes, food, and post-round drinks.',
  'Register', c.website
from public.courses c
where c.name = 'Harbor Links Golf Club'
  and not exists (
    select 1 from public.posts p where p.course_id = c.id and p.title = 'Summer scramble registration now open'
  );

-- inserts a row into public.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, 'anonymous');
  return new;
end;
$$;

-- trigger the function every time a user is created
drop trigger if exists on_auth_user_created ON auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
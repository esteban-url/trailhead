
-- Create a function that handles new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert the user id, phone, and email from auth.users into public.user
  INSERT INTO public."User" (id, phone, email, "updatedAt")
  VALUES (new.id, new.phone, new.email, now());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger that executes the function after insert on auth.users
CREATE OR REPLACE TRIGGER on_new_user
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();
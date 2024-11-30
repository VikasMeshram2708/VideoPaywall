type FetchedUser = {
  user: {
    name: string;
    email: string;
    image: string | null;
    id: string;
  };
  expires: string;
};

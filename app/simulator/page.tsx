"use client";

import { useSession } from "next-auth/react";
import App from "../app";
import { Provider } from "react-redux";
import { store } from "../store";
import { useState } from "react";

export default function HomePage() {
  let [login, setLogin] = useState(false);

  const session = useSession();
  if (!session.data?.user) return <div>Not authenticated</div>;

  const fetchData = async () => {
    const id = session.data.user?.id;
    const email = session.data.user?.email;
    await fetch(
        `http://localhost:8080/api/login?id=${id}&user=${email}`,
        {
          method: "POST",
        },
    );
  };

  if (session.data?.user && !login) {
    fetchData().then((res) => {
      setLogin(true);
    });
  }

  return (
    <>
      <Provider store={store}>
        <App></App>
      </Provider>
    </>
  );
}

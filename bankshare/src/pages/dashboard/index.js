import React, { useEffect, useState } from "react";
import DashboardSection from "./../../components/DashboardSection";
import { useAuth } from "./../../util/auth.js";
import { useRouter } from "./../../util/router.js";
import "./styles.scss";


function DashboardPage(props) {
  const auth = useAuth();
  const router = useRouter();
  const torus = window.torus

  const [user, setUser] = useState(null)

  // Redirect to signin
  // if not signed in.
  useEffect(async () => {
    if (auth.user === false) {
      router.push("/signin");
    }

    try { 
      const userInfo = torus.getUserInfo()
      setUser(userInfo)
    } catch (e) {
      console.error('error getting info', e)
    }

  }, [auth]);

  // TODO: Dashboard page after logging in.
  return (
    <DashboardSection
      color="white"
      size="large"
      title="Dashboard"
      subtitle="Dashboard components are coming to the Divjoy library soon. For now, you can implement a custom dashboard here after exporting your code."
    />
  );
}

export default DashboardPage;

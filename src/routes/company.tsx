import { useEffect, useState } from "react";
import { CompanyType } from "../../types";
import { CompanyCard } from "../components/company/Card";
import { useRedirectIfAuthenticated } from "../hooks/useRedirect";
import { BASE_URL } from "../utils/constants";
import "./company.css";

export const Company = () => {
  const navigate = useRedirectIfAuthenticated();
  const token = localStorage.getItem("token");
  const [company, setCompany] = useState<CompanyType[]>();

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await fetch(`${BASE_URL}/company`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        navigate("/");
      }
      setCompany(data);
    };
    fetchCompany();
  }, [navigate, token]);

  return (
    <>
      {company?.length === 0 ? (
        () => <h1>Empty</h1>
      ) : (
        <div className="container">
          {company?.map((c: CompanyType) => (
            <CompanyCard key={c.nit} {...c} />
          ))}
        </div>
      )}
    </>
  );
};

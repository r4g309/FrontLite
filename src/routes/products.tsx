import { useEffect, useRef, useState } from "react";
import { CompanyType } from "../../types";
import { NavBar } from "../components/navbar/navbar";
import { useRedirectIfAuthenticated } from "../hooks/useRedirect";
import { BASE_URL } from "../utils/constants";
import { getToken } from "../utils/token";
import "./products.css";

export const Products = () => {
  const navigator = useRedirectIfAuthenticated();
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  useEffect(() => {
    const getAllCompanies = async () => {
      const token = getToken() as string;
      const response = await fetch(`${BASE_URL}/company/`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      setCompanies(data);
    };
    getAllCompanies();
  }, []);

  const productPrice = useRef<HTMLInputElement>(null);
  const currentCode = useRef<HTMLSelectElement>(null);
  const pricesContainer = useRef<HTMLDivElement>(null);

  const productName = useRef<HTMLInputElement>(null);
  const productCode = useRef<HTMLInputElement>(null);
  const productFeatures = useRef<HTMLTextAreaElement>(null);
  const company = useRef<HTMLSelectElement>(null);

  const [error, setError] = useState<string>("");

  const [prices, setPrices] = useState<any[]>([]);

  const [currencies, setCurrencies] = useState<string[]>(["USD", "COP", "EUR"]);

  const addPrice = () => {
    const price = productPrice.current!.value;
    if (price === "") {
      return;
    }
    const currency = currentCode.current!.value;
    setPrices([...prices, { price: +price, currencyCode: currency }]);
    setCurrencies(currencies.filter((c) => c !== currency));
  };

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getToken() as string;
    const dataToSend = {
      name: productName.current!.value,
      code: productCode.current!.value,
      characteristics: productFeatures.current!.value,
      company: company.current!.value,
    };

    setPrices(
      prices.map((p) => ({
        code: p.currencyCode,
        price: p.price,
        product: productCode.current!.value,
      }))
    );
    console.log(prices);

    const response = await fetch(`${BASE_URL}/product/products/`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(dataToSend),
    });

    const priceResponse = await fetch(`${BASE_URL}/product/prices/`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(prices),
    });

    const productData = await response.json();
    const priceData = priceResponse.json();
    console.log(productData, priceData);

    if (response.ok) {
      navigator("/inventory");
    } else {
      setError("Error");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <>
      <NavBar />
      <form onSubmit={sendData}>
        <fieldset>
          <legend>Register Product</legend>
          <label>
            <span>Product Name</span>
            <input type="text" name="name" ref={productName} required />
          </label>
          <label>
            <span>Product Code</span>
            <input type="text" name="code" ref={productCode} required />
          </label>
          <label>
            <span>Product Features</span>
            <textarea
              name="characteristics"
              ref={productFeatures}
              rows={10}
            ></textarea>
          </label>
          <label>
            <div>
              <span>Product Price</span>
              <input
                type="number"
                ref={productPrice}
                disabled={currencies.length <= 0}
              />
              {currencies.length > 0 && (
                <select
                  className="current_code"
                  name="values"
                  ref={currentCode}
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              )}
              <button
                className="add_button"
                type="button"
                onClick={addPrice}
                disabled={currencies.length === 0}
              >
                +
              </button>
              {prices.length > 0 && (
                <div className="tool-tip-container">
                  {prices.map((price, index) => (
                    <div className="tool-tip" key={index} ref={pricesContainer}>
                      <span>
                        {price.price} {price.currencyCode}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </label>
          <label>
            <span>Company</span>
            <select name="company" className="comp" ref={company}>
              {companies.map((company) => (
                <option key={company.nit} value={company.nit}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="send-button">
            Register
          </button>
        </fieldset>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

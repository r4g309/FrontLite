import { CompanyType } from "../../../types";
export const CompanyCard = ({
  direction,
  name,
  nit,
  phone,
  products,
}: CompanyType) => {
  return (
    <article>
      <header>
        <h3>{name}</h3>
        <p>{direction}</p>
      </header>
      <p>NIT: {nit}</p>
      <p>Phone number: {phone}</p>
      <ul>
        {products.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </article>
  );
};

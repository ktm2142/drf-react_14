import { useEffect, useState } from "react";
import { publicApiClient } from "../../api";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await publicApiClient.get("shop/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("error in fetchCategories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (!categories) return <p>Loading</p>;

  return (
    <>
      <div className="category-grid">
        {categories.map((category) => (
          <div key={category.id}  className="card">
            <Link to={`/category_detail/${category.id}`}>
              <p>{category.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryList;

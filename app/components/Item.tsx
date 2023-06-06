import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Items } from './DataProvider';
import { StyledItem } from './ComponentStyles/Item.styled';
import BackArrow from './BackArrow';
import { useNavigate } from 'react-router-dom';

const Item = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState(1);

  const navigate = useNavigate();
  useEffect(() => {
    const abortCont = new AbortController();
    const fetchData = async () => {
      try {
        let fetchedData = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );
        if (!fetchedData.ok) {
          throw Error('Could not fetch the data');
        }
        fetchedData = await fetchedData.json();

        setSelected(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => abortCont.abort();
  }, [id]);

  return (
    <StyledItem>
      <figure className="item-image">
        <BackArrow className="arrow" onClick={() => navigate('/')} />
        <img src={selected?.image} alt="image of selected item" />
      </figure>
      <div className="selected-details">
        <span>{selected?.price}&nbsp;$</span>
        <div className="number-of-items">
          <input
            type="number"
            value={numberOfItems}
            min={1}
            onChange={(e) => setNumberOfItems(e.target.value)}
          />
          {numberOfItems * selected?.price}&nbsp;$
        </div>
        <button type="button">Add to cart</button>
        <p className="selected-category">{selected?.category}</p>
        <strong>{selected?.title}</strong>
        <p className="selected-description">{selected?.description}</p>
      </div>
    </StyledItem>
  );
};

export default Item;

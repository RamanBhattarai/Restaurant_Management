import React, { useEffect, useState } from 'react';
import api from '../api';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    api.get('menu/')
      .then(res => setMenuItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
        <div>
        <h1>Menu</h1>
        <ul>
            {menuItems.map(item => (
            <li key={item.id}>
                <strong>{item.name}</strong> - ${item.price}
                <p>{item.description}</p>
            </li>
            ))}
        </ul>
        </div>
    </>
    
  );
}

export default Menu;

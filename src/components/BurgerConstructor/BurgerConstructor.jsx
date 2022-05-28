import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data'

const BurgerConstructor = ({ props }) => {
  return (
    <section>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={data[0].name}
          price={200}
          thumbnail={data[0].image}
        />
        {
          data.filter((ingredient) => (ingredient.type !== 'bun')).map((ingredient) => (
            <ConstructorElement
              text={ingredient.name}
              price={50}
              thumbnail={ingredient.image}
            />
          ))
        }
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={data[0].name}
          price={200}
          thumbnail={data[0].image}
        />
      </div>
      <div>
        <p>610</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </section>
  );
};

export default BurgerConstructor;
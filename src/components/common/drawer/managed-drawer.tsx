import Cart from "@components/cart/cart";
import { useUI } from "@contexts/ui.context";
import { Drawer } from "@components/common/drawer/drawer";

const ManagedDrawer = () => {
  const { displayCart, closeCart } = useUI();
  return (
    <Drawer
      open={displayCart}
      placement={"right"}
      onClose={closeCart}
      handler={false}
      showMask={true}
      level={null}
      contentWrapperStyle={{ right: 0 }}
    >
      <Cart />
    </Drawer>
  );
};

export default ManagedDrawer;

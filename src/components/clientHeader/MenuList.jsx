import MenuItem from "./MenuItem";

function MenuList() {
  return (
    <div className="flex flex-col lg:flex-row pt-10 lg:pt-0 pl-10 lg:pl-0 gap-5 lg:gap-0 lg:space-x-10">
      <MenuItem menuLink="/home" menuName="Home" />
      <MenuItem menuLink="/rooms" menuName="Rooms" />
      <MenuItem menuLink="/about " menuName="About Us" />
      <MenuItem menuLink="/contact" menuName="Contact Us" />
      <MenuItem menuLink="/feedback" menuName="Feedbacks" />
      <MenuItem menuLink="/gallery" menuName="Gallery" />
    </div>
  );
}

export default MenuList;

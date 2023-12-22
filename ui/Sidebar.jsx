import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Copyright from "./Copyright";

const StyledSidebar = styled.aside`
  background-color: #111e24;
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  position: relative;
`;

const LowerSidebar = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50px;
`;
function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      <LowerSidebar>
        <Copyright />
      </LowerSidebar>
    </StyledSidebar>
  );
}

export default Sidebar;

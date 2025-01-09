import Header from "@/components/Header";
import Container from "react-bootstrap/Container";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Container fluid className="p-0" id="main">
        <Header />
        <main>{children}</main>
      </Container>
    </div>
  );
};

export default MainLayout;

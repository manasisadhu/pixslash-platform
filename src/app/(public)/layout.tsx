import Header from "@/components/Header/Header";
import { RootLayoutProps } from "@/lib/type";

const PublicLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl">{children}</main>
    </>
  );
};

export default PublicLayout;

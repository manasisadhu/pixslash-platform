import PrivetHeader from "@/components/Header/PrivetHeader";
import { RootLayoutProps } from "@/lib/type";

const PrivetLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <PrivetHeader />
      <main className="mx-auto max-w-7xl">{children}</main>
    </>
  );
};

export default PrivetLayout;

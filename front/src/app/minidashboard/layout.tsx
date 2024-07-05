import SideNav from "@/components/Dashboard/sidenav";



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideNav role={"admin"} />
      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

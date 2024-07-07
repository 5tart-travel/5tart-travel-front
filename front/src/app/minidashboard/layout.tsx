import SideNav from "@/app/dashboard/sidenav";



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideNav />
      <main className="flex-1 p-4 bg-white overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
// role={"admin"} <---- esto se debe colocar en el layout SideNav
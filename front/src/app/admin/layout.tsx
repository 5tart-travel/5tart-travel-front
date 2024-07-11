import SideNav from "./sidenav";



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideNav />
      <main className="flex-1 p-4 bg-cyan-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

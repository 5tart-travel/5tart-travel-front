import SideNav from './sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-screen top-0 flex-col md:flex-row md:overflow-hidden">
      <div className="">
        <SideNav />
      </div>
      <div className="flex-grow py-10 px-20 md:overflow-y-auto">{children}</div>
    </div>
  );
}

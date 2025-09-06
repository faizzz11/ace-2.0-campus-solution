import SharedLayout from "@/components/shared-layout"

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SharedLayout>{children}</SharedLayout>
}

import SharedLayout from "@/components/shared-layout"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SharedLayout>{children}</SharedLayout>
}

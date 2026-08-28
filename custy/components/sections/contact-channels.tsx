import { IconTile } from "@/components/lander";
import { SUPPORT_EMAIL, SUPPORT_PHONE, SUPPORT_PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

type Channel = {
  icon: string;
  title: string;
  value: string;
  href: string;
  note: string;
};

const channels: Channel[] = [
  {
    icon: "mail",
    title: "Email us",
    value: SUPPORT_EMAIL,
    href: `mailto:${SUPPORT_EMAIL}`,
    note: "Best for detailed questions — include your store URL so we can help faster.",
  },
  {
    icon: "phone",
    title: "Call us",
    value: SUPPORT_PHONE,
    href: SUPPORT_PHONE_HREF,
    note: "Talk to the Custy team directly about the app, plans, or your setup.",
  },
];

/**
 * The two direct contact methods (email + phone), shared by the contact and
 * support pages. Each card is one large tap target linking straight to
 * mailto:/tel:.
 */
export function ContactChannels({
  className,
  variant = "cards",
}: {
  className?: string;
  variant?: "cards" | "stack";
}) {
  return (
    <div
      className={cn(
        variant === "stack" ? "grid gap-3" : "grid gap-5 sm:grid-cols-2",
        className,
      )}
    >
      {channels.map((channel, index) => (
        <a
          key={channel.title}
          href={channel.href}
          className={cn(
            "group no-underline transition-all duration-200",
            variant === "stack"
              ? "flex items-start gap-4 rounded-2xl border border-line bg-white p-4 hover:border-[#d3dce8] hover:shadow-[0_12px_28px_-16px_rgba(16,24,40,0.16)]"
              : "rounded-2xl border border-line bg-white p-6 hover:-translate-y-1 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.14)]",
          )}
        >
          <IconTile
            name={channel.icon}
            tint={index}
            className={variant === "stack" ? "h-11 w-11 shrink-0" : "mb-5"}
          />
          <div>
            <h3 className="text-base leading-snug font-semibold text-ink">{channel.title}</h3>
            <p className="mt-1 text-[15px] font-semibold text-[#0b7fad] group-hover:underline">
              {channel.value}
            </p>
            <p className="mt-1.5 text-sm leading-[1.6] text-body">{channel.note}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

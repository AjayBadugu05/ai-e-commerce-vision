import { X, CheckCircle2, PackageCheck, Truck, MapPin, Box } from "lucide-react";
import { Order } from "@/contexts/UserContext";

interface OrderTrackerModalProps {
  order: Order | null;
  onClose: () => void;
}

const TRACKING_STEPS = [
  { label: "Order Placed", desc: "Payment authorized & verified", icon: Box },
  { label: "Processing", desc: "Inspection & custom gift packaging", icon: PackageCheck },
  { label: "Shipped", desc: "Air Priority Cargo dispatched", icon: Truck },
  { label: "Out for Delivery", desc: "Courier courier en route", icon: MapPin },
  { label: "Delivered", desc: "Signed & received by customer", icon: CheckCircle2 }
];

export const OrderTrackerModal = ({ order, onClose }: OrderTrackerModalProps) => {
  if (!order) return null;

  const getActiveStepIndex = (status: string) => {
    switch (status) {
      case "Placed": return 0;
      case "Processing": return 1;
      case "Shipped": return 2;
      case "Out for Delivery": return 3;
      case "Delivered": return 4;
      default: return 3;
    }
  };

  const currentIndex = getActiveStepIndex(order.status);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-slide-up">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-lg bg-card/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div>
            <h3 className="font-display text-xl font-bold">Live Air Tracking</h3>
            <p className="text-xs text-muted-foreground">Order ID: {order.id}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tracking Details */}
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 space-y-1">
          <p className="text-xs text-muted-foreground">Waybill Air Number: <span className="font-mono text-foreground font-semibold">{order.trackingNumber}</span></p>
          <p className="text-xs text-muted-foreground">Est. Arrival: <span className="text-primary font-bold">{order.estimatedDelivery}</span></p>
          <p className="text-xs text-muted-foreground line-clamp-1">Destination: <span className="text-foreground">{order.shippingAddress}</span></p>
        </div>

        {/* Vertical Timeline */}
        <div className="space-y-6 relative pl-4 before:absolute before:left-7 before:top-3 before:bottom-3 before:w-0.5 before:bg-border/60">
          {TRACKING_STEPS.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            const IconComp = step.icon;

            return (
              <div key={step.label} className="relative flex items-start gap-4">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center z-10 transition-all ${
                    isCompleted
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className={`font-semibold text-sm ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </h5>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary/20 text-primary font-bold animate-pulse">
                        Active Step
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={onClose} className="w-full btn-apple-secondary">
          Close Tracking Window
        </button>
      </div>
    </div>
  );
};

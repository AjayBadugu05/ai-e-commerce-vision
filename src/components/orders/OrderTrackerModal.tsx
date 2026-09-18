import { X, CheckCircle2, PackageCheck, Truck, MapPin, Box } from "lucide-react";
import { Order } from "@/contexts/UserContext";

interface OrderTrackerModalProps {
  order: Order | null;
  onClose: () => void;
}

const TRACKING_STEPS = [
  { label: "Order Placed", desc: "Payment authorized & registered", icon: Box },
  { label: "Quality Inspection", desc: "Craftsmanship audit & custom packaging", icon: PackageCheck },
  { label: "Air Priority Dispatch", desc: "Express Air Priority Cargo", icon: Truck },
  { label: "Out for Doorstep Delivery", desc: "Local courier courier en route", icon: MapPin },
  { label: "Delivered", desc: "Received & signed by collector", icon: CheckCircle2 }
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-slide-up">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-lg neu-flat-lg rounded-4xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/40">
          <div>
            <h3 className="font-display text-xl font-extrabold text-foreground">Live Air Tracking</h3>
            <p className="text-xs text-muted-foreground font-mono">Order ID: {order.id}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tracking Specs Panel */}
        <div className="p-4 rounded-3xl neu-pressed space-y-1 text-xs">
          <p className="text-muted-foreground font-semibold">Waybill Air Number: <span className="font-mono text-foreground font-extrabold">{order.trackingNumber}</span></p>
          <p className="text-muted-foreground font-semibold">Estimated Delivery: <span className="text-primary font-black">{order.estimatedDelivery}</span></p>
          <p className="text-muted-foreground font-semibold line-clamp-1">Destination: <span className="text-foreground">{order.shippingAddress}</span></p>
        </div>

        {/* Timeline */}
        <div className="space-y-6 relative pl-4 before:absolute before:left-7 before:top-3 before:bottom-3 before:w-0.5 before:bg-border/40">
          {TRACKING_STEPS.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            const IconComp = step.icon;

            return (
              <div key={step.label} className="relative flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center z-10 transition-all ${
                    isCompleted
                      ? "neu-flat text-primary font-black scale-110"
                      : "neu-pressed text-muted-foreground"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className={`font-extrabold text-sm ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </h5>
                    {isCurrent && (
                      <span className="neu-badge text-[10px] text-primary font-black">
                        Active Step
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={onClose} className="w-full neu-btn-secondary py-3 text-xs font-extrabold">
          Close Window
        </button>
      </div>
    </div>
  );
};

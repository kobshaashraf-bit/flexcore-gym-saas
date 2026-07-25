import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Star,
  Mail,
  Phone,
  Users,
  Plus,
  Calendar,
  MoreHorizontal,
  MessageSquare,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { trainers as initialTrainers } from "@/data/mockData";
import { getInitials, cn } from "@/lib/utils";
import { trainerSchema, type TrainerFormValues } from "@/schemas/moduleSchemas";
import type { Trainer } from "@/types";

export default function Trainers() {
  const [trainers, setTrainers] = useState<Trainer[]>(initialTrainers);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TrainerFormValues>({
    resolver: zodResolver(trainerSchema),
    defaultValues: { name: "", specialty: "", email: "", phone: "", experience: "" },
  });

  const onSubmit = (values: TrainerFormValues) => {
    const newTrainer: Trainer = {
      id: `t-${Date.now()}`,
      name: values.name,
      specialty: values.specialty,
      email: values.email,
      phone: values.phone,
      experience: values.experience,
      clients: 0,
      rating: 5.0,
      status: "active",
      availability: ["Mon", "Wed", "Fri"],
    };
    setTrainers((prev) => [newTrainer, ...prev]);
    toast.success(`${values.name} added to your coaching staff`);
    reset();
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trainers"
        description="Manage your coaching staff, specialties, and availability."
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button className="gap-2" onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4" /> Add Trainer
            </Button>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>Add a trainer</DialogTitle>
                <DialogDescription>Bring a new coach onto your team.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="Coach Ali Raza" error={!!errors.name} {...register("name")} />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input id="specialty" placeholder="Strength & Conditioning" error={!!errors.specialty} {...register("specialty")} />
                    {errors.specialty && <p className="text-xs text-destructive">{errors.specialty.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="coach@flexcore.gym" error={!!errors.email} {...register("email")} />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+92 300 1234567" error={!!errors.phone} {...register("phone")} />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input id="experience" placeholder="5 yrs" error={!!errors.experience} {...register("experience")} />
                  {errors.experience && <p className="text-xs text-destructive">{errors.experience.message}</p>}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding…" : "Add trainer"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="surface-card p-5">
          <p className="text-sm text-muted-foreground">Total Trainers</p>
          <p className="font-display text-2xl font-bold">{trainers.length}</p>
        </Card>
        <Card className="surface-card p-5">
          <p className="text-sm text-muted-foreground">Total Clients Coached</p>
          <p className="font-display text-2xl font-bold">{trainers.reduce((s, t) => s + t.clients, 0)}</p>
        </Card>
        <Card className="surface-card p-5">
          <p className="text-sm text-muted-foreground">Average Rating</p>
          <p className="font-display text-2xl font-bold">
            {(trainers.reduce((s, t) => s + t.rating, 0) / trainers.length).toFixed(1)} / 5.0
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {trainers.map((trainer, i) => (
          <motion.div key={trainer.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="surface-card-interactive h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={trainer.avatarUrl} alt={trainer.name} />
                      <AvatarFallback className="text-base">{getInitials(trainer.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-display font-bold">{trainer.name}</p>
                      <p className="text-xs text-muted-foreground">{trainer.specialty}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info(`Opening a conversation with ${trainer.name}`)}>
                        <MessageSquare /> Message
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info(`${trainer.name}'s schedule — coming soon`)}>
                        <Calendar /> View schedule
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Badge variant={trainer.status === "active" ? "success" : "warning"} className="capitalize">
                    {trainer.status === "active" ? "Active" : "On leave"}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {trainer.rating}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> {trainer.clients} clients
                  </span>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3" /> {trainer.email}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3" /> {trainer.phone}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <span
                      key={day}
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold",
                        trainer.availability?.includes(day)
                          ? "bg-primary-500/15 text-primary-600 dark:text-primary-400"
                          : "bg-muted text-muted-foreground/50"
                      )}
                    >
                      {day[0]}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

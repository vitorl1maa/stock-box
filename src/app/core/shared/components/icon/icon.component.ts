import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LucideAngularModule, Plus, Minus, Trash2, Pencil, X, AlignJustify, ArrowLeft, Check, LoaderCircle, Eye, EyeOff } from 'lucide-angular';
import { IconType } from './types/icon.type';

@Component({
  selector: 'app-icon',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent implements OnChanges {
  @Input() icon: keyof typeof this.iconMap = 'eye';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: "primary" | "secondary" | "danger" = "primary"


  lucideIcon: IconType = Plus

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon']) {
      this.lucideIcon = this.iconMap[this.icon] || this.iconMap['plus'];
    }
  }

  iconMap: Record<string, any> = {
    eye: Eye,
    'eye-off': EyeOff,
    minus: Minus,
    pencil: Pencil,
    trash2: Trash2,
    x: X,
    alignJustify: AlignJustify,
    arrowLeft: ArrowLeft,
    check: Check,
    loaderCircle: LoaderCircle,
    plus: Plus
  };

  get iconSize(): string {
    switch (this.size) {
      case "sm":
        return "22";

      case "md":
        return "30";

      case "lg":
        return "40";

      default:
        return "24";
    }
  }


  get iconColor() {
    switch (this.color) {
      case "secondary":
        return "#007bff"

      case "danger":
        return "#ff0000"

      default:
        return "#cccc"
    }
  }

}

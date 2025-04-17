import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Eye, EyeOff } from 'lucide-angular';
import { IconType } from './types/icon.type';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent implements OnChanges {
  @Input() icon: keyof typeof this.iconMap = "eye"
  @Input() size: "sm" | "md" | "lg" = "sm";
  @Input() color: "primary" | "secondary" | "danger" = "primary";
  lucideIcon: IconType = Eye;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["icon"]) {
      this.lucideIcon = this.iconMap[this.icon] || Eye;
    }
  }

  iconMap = {
    "eye": Eye,
    "eye-off": EyeOff
  }

}

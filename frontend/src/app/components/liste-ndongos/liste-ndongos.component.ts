import { Component,AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-liste-ndongos',
  templateUrl: './liste-ndongos.component.html',
  styleUrls: ['./liste-ndongos.component.scss']
})
export class ListeNdongosComponent  implements AfterViewInit{
  ngAfterViewInit(): void {
    this.initializeHizbChart();
}
initializeHizbChart(): void {
  const ctx = document.getElementById('hizbChart') as HTMLCanvasElement;

  if (ctx) {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Hizbs maîtrisés', 'Hizbs restants'],
        datasets: [
          {
            data: [38, 22], // 38 maîtrisés, 22 restants
            backgroundColor: ['#4caf50', '#ffc107'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }
}
}

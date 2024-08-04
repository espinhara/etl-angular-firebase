import { Component } from '@angular/core';
import { CsvImportService } from '../csv-import.service';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent {
  selectedFile!: File;

  constructor(private csvImportService: CsvImportService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.csvImportService.importCsv(this.selectedFile).subscribe(response => {
        console.log('Upload bem-sucedido', response);
      }, error => {
        console.error('Erro no upload', error);
      });
    } else {
      console.error('Nenhum arquivo selecionado');
    }
  }
}

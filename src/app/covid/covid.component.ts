import { CovidData } from './../CovidData';
import { element } from 'protractor';
import { CovidDataService } from './../covid-data.service';
import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {
  public country: string[] = [] 
  public totalCases : number[] = [];
  public recovered : number[] = [];
  public deceased : number[] = [];
  public flags : string[] = [];
  public activeCases:number[]=[];
  public criticalCases:number[]=[];
  public critical:number;
  public maxCase:number ;
  public recoverCases:number;
  public deceasedCases:number;
  public acvtiveCases:number;
  public covidData ;

  constructor(private covidService : CovidDataService) { }
  ngOnInit() : void {
    
    //Get Data for List
    this.covidService.getCovidData().subscribe(data => { this.covidData = data} );

    // Fill array (For Top10 Contries)
    this.covidService.getCovidData().
    subscribe(
      (data : CovidData[]) => {
        data.forEach(
          val =>{
            
            this.country.push(val.country);
            this.totalCases.push(this.removeCommma(val.total_cases));
            this.recovered.push(this.removeCommma(val.total_recovered));
            this.deceased.push(this.removeCommma(val.total_deaths));
            this.activeCases.push(this.removeCommma(val.active_cases));
            this.criticalCases.push(this.removeCommma(val.serious_critical));
            this.flags.push(val.flag);
          }
        )
        // Get data to show fact & Remove 1st World's Element
        this.maxCase = this.numberWithCommas(this.totalCases.shift());
        this.recoverCases = this.numberWithCommas(this.recovered.shift());
        this.deceasedCases = this.numberWithCommas(this.deceased.shift());
        this.acvtiveCases = this.numberWithCommas(this.activeCases.shift()); 
        this.critical = this.numberWithCommas(this.criticalCases.shift());       
        this.country.shift();
        this.flags.shift();        
      }, 
    );    
  }
  // Chart Code
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public countryLabel = this.country;
  public barChartType = 'bar';
  public barChartLegend = true;
  public countryData = [
      { data : this.totalCases , label : "Total Cases"},
      { data : this.recovered , label : "Recovered Case"},
      { data : this.deceased , label : "Deaths Case"}
    ];

  // Splits string into array and then each element will be check if its comma then will be replaced with
  // empty or element will be return after all loop of map Join will again make a whole string
  removeCommma(str : string){
    var result = '';
    result =  str.split('').map(s =>{return s === ','? "": s;}).join('');
    return Number.parseInt(result);
  }
  
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
}

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
  public flags : string[] = [];
  public maxCase : number ;
  public covidData ;
  public topTenCase : number[] = [];
  public topTenRec : number[] = [];

  constructor(private covidService : CovidDataService) { }
  ngOnInit() : void {
    
    //Get Data for List
    this.covidService.getCovidData().subscribe(data => { this.covidData = data } );

    // Fill array
    this.covidService.getCovidData().
    subscribe(
      (data : CovidData[]) => {
        data.forEach(
          val =>{
          
            this.country.push(val.country);
            this.totalCases.push(this.removeCommma(val.total_cases));
            this.recovered.push(this.removeCommma(val.total_recovered));
            this.flags.push(val.flag);
          }
        )
        
        this.country.shift();
        this.totalCases.shift();
        this.recovered.shift();
        this.flags.shift();
      }
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
      { data : this.recovered , label : "Recovered Case"}
    ];

    // Splits string into array and then each element will be check if its comma then will be replaced with
    // empty or element will be return after all loop of map Join will again make a whole string
  removeCommma(str : string){
    var result = '';
    result =  str.split('').map(s =>{return s === ','? "": s;}).join('');
    return Number.parseInt(result);
  }
  getTopTenOnly(){
    for (let index = 1; index < 10; index++) {
      this.topTenCase[index] = this.totalCases[index];
      this.topTenRec[index] = this.recovered[index];
    }
    this.totalCases = this.topTenCase;
    this.recovered = this.topTenRec;
    console.log(
      this.totalCases + " ----- " + this.recovered
    );
    
  }

  displayChart(){
    $("#show").click(function(){
      $(".chart").toggle();
    });
  }
}

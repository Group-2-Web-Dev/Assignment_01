//CLIEND SIDE SCRIPT FILE
// ALL CLIENT SIDE FUNCTIONS CAN BE WRITTEN HERE



(function(){
  function Start()
  {
      console.log("App Started...")

      let deleteButtons = document.querySelectorAll('.btn-danger')

      for(button of deleteButtons)
      {
          button.addEventListener('click', (event) =>{
              if(!confirm('Are you sure?'))
              {
                  event.preventDefault();
                  window.location.assign('/game-list');
              }
          });
      }

    
    // CAlculate data for charts
    if(parsed_val != null){

        console.log(parsed_val);

        let closed = 0;
        let open = 0;

        let newcase = 0; 
        let inProgress = 0;
        let scheduled = 0;
        let resolved = 0;

        let high = 0; 
        let medium = 0; 
        let low = 0; 
        
        for(let i=0;i<parsed_val.length;i++)
        {
            if(parsed_val[i].resolution.toLowerCase() == "closed"){
                closed++;
            }
            
            if(parsed_val[i].priority.toLowerCase() == "high"){
                high++;
            }
            if(parsed_val[i].priority.toLowerCase() == "medium"){
                medium++;
            }
            if(parsed_val[i].priority.toLowerCase() == "low"){
                low++;
            }


            if(parsed_val[i].status.toLowerCase() == "new"){
                newcase++;
            }
            if(parsed_val[i].status.toLowerCase() == "in progress"){
                inProgress++;
            }
            if(parsed_val[i].status.toLowerCase() == "scheduled"){
                scheduled++;
            }
            if(parsed_val[i].status.toLowerCase() == "resolved"){
                resolved++;
            }

        }

        open = parsed_val.length - closed;


        // Call chart functions
        chart1(high, medium, low);
        chart2(newcase, inProgress, scheduled, resolved);

        // Set values for closed and open tickets
        document.getElementById('closed').innerHTML = 'Closed : ' + closed;
        document.getElementById('open').innerHTML = 'Open : ' + open;

    }
      
  }

  window.addEventListener("load", Start);



  // Chart example referenced from : 
  // https://www.w3schools.com/ai/ai_google_chart.asp
  // https://developers.google.com/chart/interactive/docs/gallery/piechart
  // https://developers.google.com/chart/interactive/docs/gallery/columnchart


  //
  function chart1(high, medium, low)
  {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
        const data = google.visualization.arrayToDataTable([
        ['Priority', 'P'],
        ['High',high],
        ['Medium',medium],
        ['Low',low],   
        ]);

        const options = {
        title:'Incident Priority',
        is3D:true,
        pieSliceText: 'value',
        fontSize:14
        };

        const chart = new google.visualization.PieChart(document.getElementById('ChPriority'));
        chart.draw(data, options);
        }
  }

  function chart2(newcase, inProgress, scheduled, resolved)
  {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
        const data = google.visualization.arrayToDataTable([
        ['Status', 'Status'],
        ['New',newcase],
        ['In Progress',inProgress],
        ['Scheduled',scheduled],
        ['Resolved',resolved]    
        ]);

        const options = {
        title:'Incident Status',
        fontSize:14
        };

        const chart = new google.visualization.BarChart(document.getElementById('ChStatus'));
        chart.draw(data, options);
    }
  }

})();
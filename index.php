<!DOCTYPE html>
<html lang="de">
  <head>
  <title>SCM</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" charset="utf-8">
    <link rel="stylesheet" href="../public/css/basic.css">
    <link rel="stylesheet" href="css/scm.css">
    <link rel="stylesheet" href="libs/datepicker/css/datepicker.css">
    <script src="../public/js/basic.js"></script>
    <script src= "libs/jquery/jquery-1.11.2.js" type="text/javascript"></script>
    <script src= "libs/datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>
  </head>
  
  <body>
    <nav class="navbar navbar-default">
      <div class="navbar-header">
          <button type="button" class="system-change navbar-toggle collapsed">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
      </div>
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a id="in-li">Einkauf</a></li>
            <li><a id="out-li">Vertrieb</a></li>
            <li><a id="order-li">Bestellungen</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="system-nav" style="z-index:1">
      <ul>
        
      </ul>
    </div>

    <div class="container-fluid" id="container-in" style="display:none;">
      <div class="row">
        <div class="col-md-3">
          <div class="list-group" id="articles-grp">
          </div>

          <div class="panel panel-primary">
            <div class="panel-heading">Filter</div>
            <div class="panel-body">
              <label>Lieferant</label>
              <input type="text" class="form-control" id="lieferantInput" placeholder="Lieferant">
              <label>Ort</label>
              <input type="text" class="form-control" id="ortInput" placeholder="Ort">
              <label>Ranking</label>
              <div class="row">
                <div class="col-md-6"><input type="number" class="form-control" id="rankFromInput" placeholder="von"></div>
                <div class="col-md-6"><input type="number" class="form-control" id="rankToInput" placeholder="bis"></div>
              </div>
              <label>Bewertung</label>
              <div class="row">
                <div class="col-md-12 radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
                    Gesamt
                  </label>
                </div>
                <div class="col-md-12 radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                    Jahr
                  </label>
                </div>
                <div class="col-md-12 radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3">
                    Quartal
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12" style="height:30px;">
                  <button type="button" id="filter-in" class="btn btn-success" style="position:absolute;right:15px;">Aktualisieren</button>
                </div>                     
              </div>               
            </div>
          </div>  
        </div>

        <div class="col-md-9">
          <table id="table-in" class="table table-hover" style="display:none;">
            
          </table>
        </div>
      </div>
    </div>

    <div class="container-fluid" id="container-out" style="display:none;">
      <div class="row">
        <div class="col-md-3">
          <div class="list-group">
            <a id="wholesalers" class="list-group-item">Grossisten</a>
            <a id="persons" class="list-group-item">Personen</a>
          </div>

          <div class="panel panel-primary">
            <div class="panel-heading">Filter</div>
            <div class="panel-body">
              <label>Name</label>
              <input type="text" class="form-control" id="lieferantInputS" placeholder="Name">
              <label>Ort</label>
              <input type="text" class="form-control" id="ortInputS" placeholder="Ort">
              <div class="row" style="margin-top:10px">
                <div class="col-md-12" style="height:30px;">
                  <button type="button" id="refreshSell" class="btn btn-success" style="position:absolute;right:15px;">Aktualisieren</button>
                </div>                     
              </div>           
            </div>
          </div>
        </div>

        <div class="col-md-9">
          <table id="table-out" class="table table-hover" style="display:none;">

          </table>
        </div>
      </div>
    </div>

    <div class="container-fluid" id="container-order" style="display:none;">
      <div class="row">
        <div class="col-md-3">
          <div class="panel panel-primary">
            <div class="panel-heading">Filter</div>
            <div class="panel-body">
              <label>Bestelldatum</label>
              <input type="date" class="form-control" id="dateInput" placeholder="Datum">
              <label>Lieferant</label>
              <input type="text" class="form-control" id="lieferantInputO" placeholder="Lieferant">
              <label>Bewertung</label>
              <div class="row">
                <div class="col-md-6"><input type="text" class="form-control" id="fromInput" placeholder="von"></div>
                <div class="col-md-6"><input type="text" class="form-control" id="toInput" placeholder="bis"></div>
              </div>
              <div class="row" style="margin-top:10px">
                <div class="col-md-12" style="height:30px;">
                  <button type="button" id ="refresh-order" class="btn btn-success" style="position:absolute;right:15px;">Aktualisieren</button>
                </div>                     
              </div>                    
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <table class="table table-hover" id="table-order">
            
          </table>
        </div>
      </div>
    </div>

    <script src="js/scm.js" type="text/javascript"></script>
  </body>
</html>
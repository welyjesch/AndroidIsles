function world(){
	
}

function world(data){
	if (typeof data != 'undefined'){
		this.ticks=data.ticks;
		this.hours=data.hours;
		this.daynum=data.daynum;
		this.month=data.month;
		this.year=data.year;
		this.daytime=data.daytime;
		this.season=data.season;
		this.worldspeed=data.worldspeed;
		this.putmonth();
		this.puttimeday();
		
	}else{
		this.ticks=0;
		this.hours=1;
		this.daynum=1;
		this.month=1;
		this.year=1;
		this.daytime='night';
		this.season='winter';
		this.savedata=new Array();
		this.worldspeed=1000;
	}
	this.elapsedtime=0;
}

world.prototype.ticks;
world.prototype.ticker;
world.prototype.hours;
world.prototype.day;
world.prototype.daynum;
world.prototype.month;
world.prototype.putmonth;
world.prototype.puttimeday;
world.prototype.year;
world.prototype.season;
world.prototype.events;
world.prototype.savedata;
world.prototype.worldspeed;
world.prototype.elapsedtime;

world.prototype.putmonth=function(){
	if (this.month%12==0) $('#month').html('Dec');
	if (this.month%12==1) $('#month').html('Jan');
	if (this.month%12==2){
		$('#month').html('Feb');
		$('#worldseason').html('Spring');
		this.season='Spring';
		$('#map img').attr('src', 'images/leafhaven.jpg');
	}
	if (this.month%12==3) $('#month').html('Mar');
	if (this.month%12==4) $('#month').html('Apr');
	if (this.month%12==5){
		$('#month').html('May');
		$('#worldseason').html('Summer');
		this.season='Summer';
		$('#map img').attr('src', 'images/leafhavenbright.jpg');
	}
	if (this.month%12==6) $('#month').html('Jun');
	if (this.month%12==7) $('#month').html('Jul');
	if (this.month%12==8){
		$('#month').html('Aug');
		$('#worldseason').html('Fall');
		this.season='Fall';
	}
	if (this.month%12==9) $('#month').html('Sep');
	if (this.month%12==10) $('#month').html('Oct');
	if (this.month%12==11){
		$('#month').html('Nov');
		$('#worldseason').html('Winter');
		this.season=='Winter';
		$('#map img').attr('src', 'images/leafhavensnow.jpg');
	}
}

world.prototype.puttimeday=function(){
	if (this.hours<10) $('#hours').html('0'+this.hours);
	else if (this.hours==24) $('#hours').html('00');
	else $('#hours').html(this.hours);
	if (this.daynum%7==0) $('#worldday').html('Sun');
	if (this.daynum%7==1) $('#worldday').html('Mon');
	if (this.daynum%7==2) $('#worldday').html('Tue');
	if (this.daynum%7==3) $('#worldday').html('Wed');
	if (this.daynum%7==4) $('#worldday').html('Thu');
	if (this.daynum%7==5) $('#worldday').html('Fri');
	if (this.daynum%7==6) $('#worldday').html('Sat');	
	if (this.year<10) $('#yrnum').html('00'+this.year);
	else if (this.year<100) $('#yrnum').html('0'+this.year);
	else $('#yrnum').html(this.year);
	$('#mins').html(this.ticks+'0');
	$('#daynum').html(this.daynum);
	$('#worldseason').html(this.season);
	
}

world.prototype.ticker=function(){
	this.ticks = this.ticks + 1;
	
	if ((this.elapsedtime>-1)&&(this.elapsedtime<2)){
		if (this.daytime=='day'){
			$('#map img').animate({"opacity": 1}, 1000);
			$('#daypart').attr('src','images/ui/sun45px.png');
		}else if (this.daytime=='night'){
			$('#map img').animate({"opacity": 0}, 1000);
			$('#daypart').attr('src','images/ui/moon45px.png');
		}else{
			$('#map img').animate({"opacity": 0.5}, 1000);
		}
	}
	
	if (this.ticks>5){
		this.hours = this.hours + 1;
		this.ticks=0;
		
		if (this.hours==6){
			$('#daypart').attr('src','images/ui/sun45px.png');
			this.daytime='day';
			$('#map img').animate({"opacity": 1}, 10000);
		}else if (this.hours==18){
			$('#daypart').attr('src','images/ui/moon45px.png');
			this.daytime='night';
			$('#map img').animate({"opacity": 0}, 10000);
		}
		
		if (this.hours<10) $('#hours').html('0'+this.hours);
		else if (this.hours==24) $('#hours').html('00');
		else $('#hours').html(this.hours);
		
	}
		
	if (this.hours>23){
		this.daynum = this.daynum + 1;
		
		if (this.daynum%7==0) $('#worldday').html('Sun');
		if (this.daynum%7==1) $('#worldday').html('Mon');
		if (this.daynum%7==2) $('#worldday').html('Tue');
		if (this.daynum%7==3) $('#worldday').html('Wed');
		if (this.daynum%7==4) $('#worldday').html('Thu');
		if (this.daynum%7==5) $('#worldday').html('Fri');
		if (this.daynum%7==6) $('#worldday').html('Sat');
		
		this.hours=0;
		
		$('#daynum').html(this.daynum);
	}
	
	var monthday=31;
	
	switch (this.month){
	case 1,3,5,7,8,10,12: monthday=31;
						  break;
	case 2: if (this.year%4==0) monthday=29;
			else monthday=28;
			break;
	case 4, 6, 9, 11: monthday = 30;
			break;
	}
	
	if (this.daynum>monthday){
		this.month = this.month + 1;
		this.daynum=1;
		$('#daynum').html('1');
		this.putmonth();
	}
	
		
	if (this.month>12){
		this.year = this.year + 1;
		this.month=1;
		if (this.year<10) $('#yrnum').html('00'+this.year);
		else if (this.year<100) $('#yrnum').html('0'+this.year);
		else $('#yrnum').html(this.year);
	}
	
	$('#mins').html(this.ticks+'0');
	//$('#ticks').html(this.ticks);
	this.save();
	this.elapsedtime++;
};

world.prototype.save=function(){
	this.savedata={
		ticks: this.ticks,
		hours: this.hours,
		daynum: this.daynum,
		month: this.month,
		year: this.year,
		daytime: this.daytime,
		season: this.season,
		worldspeed: this.worldspeed
	}
}

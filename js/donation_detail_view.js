

DonationDetailView = {
  betterplace_api : "https://www.betterplace.org/en/api_v4/",

  update : function(data) {
    DonationDetailView.last_donation = data
    this.getProjectDetails(data.project_id)
  },

  getProjectDetails: function(project_id) {
    $.ajax({
      type: "GET",
      url: this.betterplace_api + "projects/" + project_id,
    }).done(function( project ) {
      DonationDetailView.displayProject(project)
    });
  },

  displayProject: function(project) {
    if (DonationDetailView.last_donation.project_id != project.id) {
      console.error("displaying the wrong donation data!!!");
    }

    var amount = DonationDetailView.last_donation.amount;
    amount = (amount > 0) ? amount : 1;

    $("#last_donation      h2").html(project.title)
    $("#last_donation .amount").html("€" + amount)
    $("#last_donation   .time").html(moment(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a"))
  }

}


